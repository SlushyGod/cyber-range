import boto3
from TaskDatabase import TaskRepository
from ChallengeRepository import ChallengeRepository

client = boto3.client('ecs')

# Maybe during an update of tasks, it also removes any tasks that are stale?
# Maybe call it TaskRunner?
# When classes start getting names like 'helper' and 'manager', its because the purpose has not been
#   well defined
class TaskOrchestrator():
  def __init__(self, user_id):
    self._task_repository = TaskRepository(user_id)
    self._challenge_repository = ChallengeRepository()

  def clear_tasks(self):
    tasks = self._task_repository.get_tasks()
    for task in tasks:
      self.stop_task(task)

  def stop_task(self, task):
    response = client.stop_task(
      cluster=task.task_cluster,
      task=task.task_arn,
      reason="User requested stop"
    ) 
    self._task_repository.del_task(task)

  def run_task(self, challenge_id):
    challenge = self._challenge_repository.get_challenge(challenge_id)
    # Design patterns for how to do this if the challenge cant be found?
    # Check if challenge is empty?

    cluster = challenge.ecs_cluster
    response = client.run_task(
      cluster=cluster,
      count=1,
      enableECSManagedTags=False,
      enableExecuteCommand=False,
      launchType='FARGATE',
      networkConfiguration={
        'awsvpcConfiguration': {
          'subnets': challenge.ecs_subnets,
          'securityGroups': challenge.ecs_security_groups,
          'assignPublicIp': 'ENABLED'
        }
      },
      taskDefinition=challenge.ecs_task
    )

    # Add the ID of the running task
    arn = response["tasks"][0]['taskArn']


    waiter = client.get_waiter('tasks_running')
    waiter.wait(cluster=challenge.ecs_cluster, tasks=[arn])

    response = client.describe_tasks(cluster=challenge.ecs_cluster, tasks=[arn])

    task_details = response['tasks'][0]['attachments'][0]['details']
    for detail in task_details:
      if detail['name'] == 'networkInterfaceId':
        eni_id = detail['value']

    eni = boto3.resource('ec2').NetworkInterface(eni_id)
    self._task_repository.add_task(response, challenge_id, eni.association_attribute['PublicIp'])

    return eni.association_attribute['PublicIp']

