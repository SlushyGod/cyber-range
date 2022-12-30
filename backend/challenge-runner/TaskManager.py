import boto3
from TaskDatabase import TaskRepository

client = boto3.client('ecs')

# Maybe during an update of tasks, it also removes any tasks that are stale?
# Maybe call it TaskRunner?
# When classes start getting names like 'helper' and 'manager', its because the purpose has not been
#   well defined
class TaskManager():
  def __init__(self, user_id):
    self._task_database = TaskRepository(user_id)

  def clear_tasks(self):
    tasks = self._task_database.get_tasks()
    for task in tasks:
      self.stop_task(task)

  def stop_task(self, task):
    response = client.stop_task(
      cluster=task.task_cluster,
      task=task.task_arn,
      reason="User requested stop"
    ) 
    self._task_database.del_task(task)

  def run_task(self, task_definition):
    cluster = 'arn:aws:ecs:us-east-2:166853359275:cluster/cluster-hackasat-qualifier-2021'
    response = client.run_task(
      cluster=cluster,
      count=1,
      enableECSManagedTags=False,
      enableExecuteCommand=False,
      launchType='FARGATE',
      networkConfiguration={
        'awsvpcConfiguration': {
          'subnets': [
            'subnet-87495aef',
          ],
          'securityGroups': [
            'sg-dfaa11bc',
          ],
          'assignPublicIp': 'ENABLED'
        }
      },
      taskDefinition=task_definition
    )

    # Add the ID of the running task
    self._task_database.add_task(response)

