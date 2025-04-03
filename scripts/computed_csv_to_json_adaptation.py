# -*- coding: utf-8 -*-
"""
Created on Tue Mar 25 17:22:35 2025

@author: SSINGH
"""

import pandas as pd

df = pd.read_csv ("../public/All_adaptation_crops_corrected2.csv")
df['ID'] = df['ID'].apply(lambda x: x.lower() if isinstance(x, str) else x)
df = df.set_index('ID')
df.to_json("../public/All_adaptation_crops_corrected2.json", index='ID', orient='index')
