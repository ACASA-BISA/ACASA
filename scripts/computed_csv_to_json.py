import pandas as pd

df = pd.read_csv ("../public/Computed.csv")
df['Filename'] = df['Filename'].apply(lambda x: x.lower() if isinstance(x, str) else x)
df = df.set_index('Filename')
df.to_json("../public/Computed.json", index='Filename', orient='index')
