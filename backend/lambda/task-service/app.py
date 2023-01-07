from TaskOrchestrator import TaskOrchestrator
from TaskDatabase import TaskRepository
import json

def lambda_handler(event, context):
  method = event['requestContext']['http']['method']
  user_id = event['requestContext']['authorizer']['jwt']['claims']['preferred_username']

  if user_id == None:
    return 404

  if method == 'GET':
    repository = TaskRepository(user_id)
    tasks = repository.get_tasks()

    filtered_tasks = []
    for task in tasks:
      filtered_tasks.append({
        'challengeId': task.challenge_id,
        'connection': task.connection_info,
        'timeout': task.stop_timestamp
      })

    return filtered_tasks
  
  elif method == 'POST':
    orchestrator = TaskOrchestrator(user_id)
    orchestrator.clear_tasks()

    body = json.loads(event['body'])
    challengeId = body.get('challengeId', None)

    if challengeId == None:
      return 404

    task = orchestrator.run_task(challengeId)

  return task

if __name__ == '__main__':
  body = '{"group": "hackasat 2022", "name": "basic file"}'
  resp = lambda_handler({
    'routeKey': 'POST /task',
    'body': body
  }, None)

  resp = lambda_handler({
    'routeKey': 'GET /task'
  }, None)
  print(resp)

