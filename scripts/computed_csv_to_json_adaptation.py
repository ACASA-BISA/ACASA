# -*- coding: utf-8 -*-
"""
Created on Tue Mar 25 17:22:35 2025

@author: SSINGH
"""

import pandas as pd
import numpy as np

df = pd.read_csv ("../public/All_adaptation_crops_corrected.csv")
df['ID'] = df['ID'].apply(lambda x: x.lower() if isinstance(x, str) else x)
df = df.applymap(lambda x: int(x) if isinstance(x, (float, np.float64)) and not np.isnan(x) else x)

df = df.set_index('ID')
df.to_json("../public/All_adaptation_crops_corrected.json", index='ID', orient='index')
