from TaskOrchestrator import TaskOrchestrator
from TaskDatabase import TaskRepository
import json

def lambda_handler(event, context):
  route_key = event['routeKey']
  [method, route] = route_key.split(' ')


  if method == 'GET':
    repository = TaskRepository(1)
    return repository.get_tasks()
  
  elif method == 'POST':
    orchestrator = TaskOrchestrator(1)
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

