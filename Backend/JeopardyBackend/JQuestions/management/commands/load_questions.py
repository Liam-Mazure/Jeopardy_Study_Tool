import json
import os
from django.conf import settings
from django.core.management.base import BaseCommand
from JQuestions.models import Question

class Command(BaseCommand):
    help = "Loads question data from JSON file into database"


    def handle(self, *args, **kwargs):
        file_path = os.path.join(settings.BASE_DIR, 'JQuestions', 'data', 'questiondata.json')

        try:
            with open(file_path, "r", encoding = "utf-8") as file:
                data = json.load(file)

            count_added = 0
            count_skipped = 0

            for entry in data:
                curSeason = entry.get("cur_season", 1)
                curEpisode = entry.get("cur_episode", 1)
                category = (entry.get("category") or "Unknown Category").strip() 
                questionText = (entry.get("question_text") or "Unknown Question").strip()
                questionRes = (entry.get("question_res") or "Unknown Response").strip()

                #print(f"Debug {entry}")

                if not questionText or not questionRes or not category:
                    self.stdout.write(self.style.WARNING(f"Skipped (null values): {entry}"))
                    count_skipped += 1
                    continue

                if len(questionText) <= 1 and questionText.startswith("(") or len(questionRes) <= 1 and questionRes.startswith("("):
                    self.stdout.write(self.style.WARNING(f"Skipped (too short): {entry}"))
                    count_skipped += 1
                    continue

                #print(f"Debug: {questionText}")

                if Question.objects.filter(questionText = questionText).exists():
                    self.stdout.write(self.style.WARNING(f"Skipped (Duplicte): {entry}"))
                    count_skipped += 1
                    continue

                Question.objects.create(
                    curEpisode = curEpisode,
                    curSeason = curSeason,
                    category = category,
                    questionText = questionText,
                    questionRes = questionRes,
                )
                count_added += 1


            self.stdout.write(self.style.SUCCESS(f"Successfully added {count_added} questions!"))
            self.stdout.write(self.style.WARNING(f"Skipped {count_skipped} questions..."))
        
        except FileNotFoundError:
            self.stderr.write(self.style.ERROR("File not found..."))