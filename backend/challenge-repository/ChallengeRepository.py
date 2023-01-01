from ChallengeModel import ChallengeModel

# Need to refactor this, use inheritance, this doesn't really make any sense
# Challenge object, keeps the challenges standardized
class Challenge():
  def __init__(self, challenge_model=None):
    self.group = None
    self.name = None
    self.category = None
    self.timeout = None
    self.flag = None
    self.type = None
    self.static = None
    self.storage = None # Used for additional information that might not be captured normally

    if (challenge_model):
      self.from_model(challenge_model)

  # Should probable stick with serialize, deserialize?
  def from_model(self, challenge_model):
    """
        Loads a challenge model into the challenge object, will throw errors if not all attributes are defined
        """
    self.group = challenge_model.group
    self.name = challenge_model.name
    self.category = challenge_model.category
    self.timeout = challenge_model.timeout
    self.flag = challenge_model.flag
    self.static = challenge_model.static
    self.type = challenge_model.type

    self.ecs_task = challenge_model.ecs_task
    self.ecs_cluster = challenge_model.ecs_cluster

  def to_model(self):
    """
        Create new model and return it? Should I save it?
        """
    challenge = ChallengeModel(
      group=self.group,
      name=self.name,
      category=self.category,
      timeout=self.timeout,
      flag=self.flag,
      static=self.static,
      type=self.type,
      ecs_task=self.ecs_task,
      ecs_cluster=self.ecs_cluster
    )

    return challenge

  def serialize(self):
    challenge = dict()
    challenge['group'] = self.group
    challenge['name'] = self.name
    challenge['category'] = self.category
    challenge['timeout'] = self.timeout
    challenge['flag'] = self.flag
    challenge['type'] = self.type
    challenge['static'] = self.static
    challenge['storage'] = self.storage

    return challenge

""" 
    Treat this as a class that you can just pull all of the challenges, as well as put all of the challenges

    Should be a singleton?
    """
class ChallengeRepository():
  def get_challenges(challenge_filter=None):
    # TODO: Implement pagination
    challenges = ChallengeModel.scan()
    challenges = [Challenge(challenge) for challenge in challenges]
    return [challenge.serialize() for challenge in challenges]

  def add_challenge(self, challenge):
    new_challenge = challenge.to_model()
    new_challenge.save()

  def get_challenge(self, challenge_id):
    ids = challenge_id.split('#')
    challenge = ChallengeModel.get(ids[0], ids[1])
    return challenge

  def delete_challenge(self, challenge_id):
    challenge = self.get_challenge(challenge_id)
    challenge.delete()

  def update_challenge(self, challenge_id, challenge):
    challenge = self.get_challenge(challenge_id)

