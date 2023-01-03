from ChallengeRepository import ChallengeRepository, Challenge
from ChallengeModel import ChallengeModel

challenge = ChallengeModel(
  group='hackasat 2022',
  name='basic file',
  category='warmup',
  timeout=1800,
  flag='flag{flag}',
  points=100,
  downloads=['flag.tar.bz2'],
  type='standard',
  ecs_task='hackasat-qualifier-2021-treefall',
  ecs_cluster='arn:aws:ecs:us-east-2:166853359275:cluster/cluster-hackasat-qualifier-2021',
  ecs_subnets=['subnet-87495aef'],
  ecs_security_groups=['sg-dfaa11bc']
)

'''
challenge = ChallengeModel(
  group='hackasat 2021',
  name='treefall',
  category='warmup',
  timeout=1800,
  flag='flag{flag}',
  static=['flag.tar.bz2'],
  type='standard'
)
'''

#vars(challenge)
challenge = Challenge(challenge)
challenge_repository = ChallengeRepository()
challenge_repository.add_challenge(challenge)

print(challenge_repository.get_challenges())
