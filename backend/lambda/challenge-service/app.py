from ChallengeRepository import ChallengeRepository

def lambda_handler(event, context):
  challenges = ChallengeRepository.get_challenges()

  filtered_challenges = []
  for challenge in challenges:
    filtered_challenges.append({
      'id': challenge['id'],
      'name': challenge['name'],
      'group': challenge['group'],
      'category': challenge['category'],
      'downloads': challenge['downloads']
    })

  return filtered_challenges

if __name__ == '__main__':
  challenges = lambda_handler('','')
  print(challenges)
