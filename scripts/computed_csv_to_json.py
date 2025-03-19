import pandas as pd

df = pd.read_csv ("../public/Crops_Livestock_HEV_March.csv")
df['ID'] = df['ID'].apply(lambda x: x.lower() if isinstance(x, str) else x)
df = df.set_index('ID')
df.to_json("../public/All_hazards_crops_corrected.json", index='ID', orient='index')
