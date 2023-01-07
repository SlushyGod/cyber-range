from ChallengeRepository import ChallengeRepository

def lambda_handler(event, context):
  challenges = ChallengeRepository.get_challenges()

  filtered_challenges = []
  for challenge in challenges:
    filtered_challenge = dict()
    filtered_challenge['id'] = challenge.id
    filtered_challenge['name'] = challenge.name
    filtered_challenge['group'] = challenge.group
    filtered_challenge['category'] = challenge.category
    filtered_challenge['downloads'] = challenge.downloads

  return filtered_challenges
