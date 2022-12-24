from ChallengeRepository import ChallengeRepository, Challenge

challenge = {
  'group': 'hackasat 2021',
  'challenge': 'treefall',
  'category': 'binary',
  'timeout': '1800',
  'flag': 'flag{treefall}',
  'type': 'standard',
  'storage': ''
}

#vars(challenge)
challenge = Challenge(**challenge)
challenge_repository = ChallengeRepository()
challenge_repository.add_challenge(challenge)

print(challenge_repository.get_challenges())
