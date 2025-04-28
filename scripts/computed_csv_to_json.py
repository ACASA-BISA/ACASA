import pandas as pd
import numpy as np

df = pd.read_csv ("../public/Crops_Livestock_HEV_April2.csv")
df['ID'] = df['ID'].apply(lambda x: x.lower() if isinstance(x, str) else x)
df = df.applymap(lambda x: int(x) if isinstance(x, (float, np.float64)) and not np.isnan(x) else x)

df = df.set_index('ID')
df.to_json("../public/All_hazards_crops_corrected2.json", index='ID', orient='index')
