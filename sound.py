import asyncio
import edge_tts
import os
import string

os.makedirs("sounds", exist_ok=True)

VOICE = "en-US-JennyNeural"

async def make_audio(letter):
    tts = edge_tts.Communicate(letter, VOICE)
    await tts.save(f"sounds/{letter}.mp3")

async def main():
    for letter in string.ascii_uppercase:
        await make_audio(letter)

asyncio.run(main())