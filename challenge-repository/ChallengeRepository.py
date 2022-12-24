from ChallengeModel import ChallengeModel

# Challenge object, keeps the challenges standardized
class Challenge():
  def __init__(self, challenge_model=None):
    self.group = None
    self.challenge = None
    self.category = None
    self.timeout = None
    self.flag = None
    self.type = None
    self.storage = None # Used for additional information that might not be captured normally

    if (challenge_model):
      self.from_model(challenge_model)

  def from_model(self, challenge_model):
    """
        Loads a challenge model into the challenge object, will throw errors if not all attributes are defined
        """
    self.group = challenge_model.group_name
    self.challenge = challenge_model.challenge_name
    self.category = challenge_model.category
    self.timeout = challenge_model.timeout
    self.flag = challenge_model.flag
    self.type = challenge_model.type

  def to_model(self):
    """
        Create new model and return it? Should I save it?
        """
    challenge = ChallengeModel(
      group=self.group_name,
      challenge=self.challenge_name,
      category=self.category,
      timeout=self.timeout,
      flag=self.flag,
      type=self.type,
      ecs_task=self.ecs_info
    )

""" 
    Treat this as a class that you can just pull all of the challenges, as well as put all of the challenges

    Should be a singleton?
    """
class ChallengeRepository():
  def get_challenges(challenge_filter=None):
    # TODO: Implement pagination
    challenges = ChallengeModel.scan()
    return [challenge._serialize() for challenge in challenges]

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

  def _serialize(self):
    return

  def _deserialize(self):
    return






