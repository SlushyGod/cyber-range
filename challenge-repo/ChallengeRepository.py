from ChallengeModel import ChallengeModel

# Challenge object, keeps the challenges standardized
class Challenge():
  def __init__(self):
    self.group_name = None
    self.challenge_name = None
    self.category = None
    self.timeout = None
    self.flag = None
    self.type = None
    self.storage = None # Used for additional information that might not be captured normally

""" 
    Treat this as a class that you can just pull all of the challenges, as well as put all of the challenges

    Should be a singleton?
    """
class ChallengeRepository():
  def get_challenges(challenge_filter=None):
    # TODO: Implement pagination
    challenges = ChallengeModel.scan()
    return [challenge._serialize() for challenge in challenges]

  def add_challenge(challenge):
    group = challenge.group_name
    challenge = challenge.challenge_name
    category = challenge.category
    timeout = challenge.timeout
    flag = challenge.flag
    challenge_type = challenge.type
    ecs_info = challenge.storage

    new_challenge = ChallengeModel(
      group=group
      challenge=challenge
      category=category
      timeout=timeout
      flag=flag
      type=challenge_type
      ecs_task=ecs_info.task
      ecs_task=ecs_info.cluster
    )
