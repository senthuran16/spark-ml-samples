import random
import pandas as pd
import numpy as np

from lyricsgenius import Genius

# token = 'rMXrBDtCqprCZa-MO4qsKLiwkqjJamORVb3LjFnSROX-M4jsvmdrdS_iv0dyxiav'
#
# genius = Genius(token, timeout=30, retries=3)
#
# page = 1
# songs = []
# while page < 6:
#     res = genius.tag('soul', page=page)
#     for hit in res['hits']:
#         songDetails = [hit['artists'][0], hit['title'], random.randrange(1995, 2020), 'soul',
#                        genius.lyrics(song_url=hit['url'])]
#         print("Working....")
#         songs.append(songDetails)
#     page = res['next_page']
#
# print(len(songs))
#
# arr = np.asarray(songs)
# pd.DataFrame(arr).to_csv('student_dataset.csv', header=['artist_name', 'track_name', 'release_date', 'genre', 'lyrics'])

# Filter required columns
# filtered_mendeley_df = pd.read_csv("mendeley_dataset.csv", usecols=['artist_name', 'track_name', 'release_date', 'genre', 'lyrics'])
# filtered_mendeley_df.to_csv('filtered_mendeley_dataset.csv')

# Combine the datasets
filtered_mendeley_df = pd.read_csv("filtered_mendeley_dataset.csv")
student_df = pd.read_csv("student_dataset.csv")
merged_df = pd.concat([filtered_mendeley_df, student_df], ignore_index=True)
merged_df.to_csv('merged_dataset.csv')
