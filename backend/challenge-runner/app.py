from time import sleep
import boto3
from TaskManager import TaskManager

task_manager = TaskManager(1)
task_manager.run_task('hackasat-qualifier-2021-treefall')
sleep(10)
task_manager.clear_tasks()





