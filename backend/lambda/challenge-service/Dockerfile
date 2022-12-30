FROM public.ecr.aws/lambda/python:3.8

COPY challenge-repository/requirements.txt .
RUN python3 -m pip install -r requirements.txt

COPY challenge-repository/ChallengeRepository.py .
COPY challenge-repository/ChallengeModel.py .
COPY lambda/challenge-service/app.py .

CMD [ "app.lambda_handler" ]
