from time import sleep
import boto3
from TaskOrchestrator import TaskOrchestrator

task_manager = TaskOrchestrator(1)
task_manager.run_task("hackasat 2022#basic file")
sleep(10)
task_manager.clear_tasks()





