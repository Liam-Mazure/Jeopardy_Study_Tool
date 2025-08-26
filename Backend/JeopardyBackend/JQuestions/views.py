from django.shortcuts import render, HttpResponse
import random
import os
from django.http import JsonResponse
from .models import Question
from .serializers import QuestionDeserializer
from django.views.generic import View
from django.conf import settings

# Create your views here.
# class FrontendAppView(View):
#     def get(self, request):
#         index_path = os.path.join(settings.BASE_DIR.parent, 'frontend', 'dist', 'index.html')
#         if os.path.exists(index_path):
#             with open(index_path) as f:
#                 return HttpResponse(f.read())
#         return HttpResponse("React build not found. Run `npm run build` in Frontend.", status=501)

def play(request):
    print("play view called")
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