from django.shortcuts import render, HttpResponse
import random
from django.http import JsonResponse
from .models import Question
from .serializers import QuestionDeserializer


# Create your views here.
def home(request):
    return render(request, "home.html")

def play(request):
    question_count = Question.objects.count()

    if question_count == 0:
        return JsonResponse({"error: No question available"}, status = 404)
    
    random_index = random.randint(0, question_count - 1)
    random_question = Question.objects.all()[random_index]
    serializer = QuestionDeserializer(random_question)

    data = {
        "curSeason": random_question.curSeason,
        "curEpisode": random_question.curEpisode,
        "category": random_question.category,
        "questionText": random_question.questionText,
        "questionRes": random_question.questionRes,
    }
    return JsonResponse(serializer.data)

def auto_play(request):
    return HttpResponse("Auto Play Game")