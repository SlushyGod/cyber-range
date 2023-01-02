from ChallengeRepository import ChallengeRepository
import json

# Set PYTHONPATH when testing to be able to grab these modules
def lambda_handler(event, context):
  body = json.loads(event['body'])
  submitted_flag = body.get('flag', None)
  challenge_group = body.get('group', None)
  challenge_name = body.get('name', None)

  if (submitted_flag == None
      or challenge_group == None
      or challenge_name == None):
    return False

  challengeRepo = ChallengeRepository()
  
  challenge = challengeRepo.get_challenge(challenge_group + "#" + challenge_name)

  if submitted_flag == challenge.flag:
    return True

  return False


if __name__ == '__main__':
  body = '{"flag":"flag{flag}","group":"hackasat 2022","name":"basic file"}'
  val = lambda_handler({'body': body}, None)

  print(val)
