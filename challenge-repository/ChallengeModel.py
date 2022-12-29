from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, NumberAttribute, ListAttribute

# What should be configurable and what shouldn't be?
# Should this model be specific to just the platforms challenge,
#   and its just up to the plugin, or rest of the code to add the stuff that they need?

# CLI interface that uploads the challenges to this platform, how does it store that in this model
#   orrrrrr should I just make the repository class abstract all of it away, and just make this be able
#   to handle it <- think thats what I do, the repository should have some methods that allow for the
#   flexibility, and the plugin inherits making those happen when interfacing with their own database
class ChallengeModel(Model):
  class Meta:
    table_name = 'challenge'
    region = 'us-east-2'

  group = UnicodeAttribute(hash_key=True)
  challenge = UnicodeAttribute(range_key=True)
  category = UnicodeAttribute(null=False)
  timeout = NumberAttribute(null=False)
  flag = UnicodeAttribute(null=False)
  static = ListAttribute(null=True)
  type = UnicodeAttribute(null=False)

  ecs_task = UnicodeAttribute(null=False)
  ecs_cluster = UnicodeAttribute(null=False)
  ecs_data = UnicodeAttribute(null=True)
