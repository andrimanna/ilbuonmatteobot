ECHO OFF
ffmpeg.exe -i data\prova.mp3 -ac 1 -map 0:a -codec:a libopus -b:a 128k -vbr off -ar 24000 audio.ogg
