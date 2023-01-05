from TaskOrchestrator import TaskOrchestrator
from TaskDatabase import TaskRepository
import json
import jwt

def get_auth_token(event):
  auth_header = event['Authorization']
  token = auth_header.split(' ')[1]

  return jwt.decode(token, options={"verify_signature": False})

def lambda_handler(event, context):
  method = event['requestContext']['http']['method']
  user_id = event['requestContext']['authorizer']['jwt']['claims']['preferred_username']

  if user_id == None:
    return 404

  if method == 'GET':
    repository = TaskRepository(user_id)
    tasks = repository.get_tasks()

    challenge_ids = []
    for task in tasks:
      challenge_ids.append({
        'id': task.challenge_id,
        'connection': task.connection_info
      })

    return challenge_ids
  
  elif method == 'POST':
    orchestrator = TaskOrchestrator(user_id)
    orchestrator.clear_tasks()

    body = json.loads(event['body'])
    group = body.get('group', None)
    name = body.get('name', None)

    if group == None or name == None:
      return 404

    task = orchestrator.run_task(group + '#' + name)

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

