FROM public.ecr.aws/lambda/python:3.8

COPY challenge-runner/requirements.txt .
RUN python3 -m pip install -r requirements.txt

COPY challenge-repository/ChallengeRepository.py .
COPY challenge-repository/ChallengeModel.py .
COPY challenge-runner/TaskOrchestrator.py .
COPY challenge-runner/TaskDatabase.py .
COPY lambda/task-service/app.py .

CMD [ "app.lambda_handler" ]
