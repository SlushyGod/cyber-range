import time
from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, NumberAttribute

class RunningTaskModel(Model):
  """ RunningTaskModel
        Holds the started tasks, doesn't remove outdated tasks until a lookup is performed
      """
  class Meta:
    table_name = 'running-task'
    region = 'us-east-2'
 
  user_id = UnicodeAttribute(hash_key=True)
  task_arn = UnicodeAttribute(range_key=True)

  challenge_id = UnicodeAttribute(null=False)
  connection_info = UnicodeAttribute(null=False)
  task_cluster = UnicodeAttribute(null=False)
  start_timestamp = NumberAttribute(default=int(time.time()))
  stop_timestamp = NumberAttribute(default=int(time.time()) + 1800)

class TaskRepository():
  def __init__(self, user_id):
    self.user_id = user_id
    self._update_tasks()

  def get_tasks(self):
    self._update_tasks()
    return RunningTaskModel.query(str(self.user_id))

  # TODO: change to use the challegnes timestamp instead of 30min
  def add_task(self, task_data, challenge_id, conn):
    for task in task_data['tasks']:
      new_task = RunningTaskModel(
        user_id=str(self.user_id),
        task_arn=str(task['containers'][0]['taskArn']),
        connection_info=conn,
        challenge_id=challenge_id,
        task_cluster=str(task['clusterArn'])
      )
      new_task.save() 

  def del_task(self, task):
    task.delete()

  def _get_all_tasks(self):
    return RunningTaskModel.query(str(self.user_id))

  def _update_tasks(self):
    tasks = self._get_all_tasks()
    timestamp = int(time.time())

    # Make the time configurable, or based on the env variable of the image
    for task in tasks:
      if (timestamp - task.start_timestamp > 1800):
        self.del_task(task)
