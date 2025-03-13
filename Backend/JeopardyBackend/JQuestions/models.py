from django.db import models

# Create your models here.
class Question(models.Model):
    curSeason = models.IntegerField( default=1)
    curEpisode = models.IntegerField(default=1)
    category = models.CharField(max_length=200)
    questionText = models.TextField(max_length=400, null=False, blank=False)
    questionRes = models.TextField(max_length=300, null=False, blank=False)

    def __str__(self):
        return f"Season {self.curSeason}, Episode {self.curEpisode} - {self.category}: {self.questionText} (Answer: {self.questionRes})"