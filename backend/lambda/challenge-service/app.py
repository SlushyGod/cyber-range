from ChallengeRepository import ChallengeRepository

def lambda_handler(event, context):
  challenges = ChallengeRepository.get_challenges()
  return challenges
