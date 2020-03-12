$file_path = "E:\NAS-01-E\Chernobyl\Chernobyl (1).mkv"
$subtitle_path = "E:\NAS-01-E\Chernobyl\Chernobyl (1).srt"
$output_path = "C:\Users\Steve\WebApp\express-video\cdn\videos\output"
$file = [System.IO.DirectoryInfo]($file_path)
$subtitle = [System.IO.DirectoryInfo]($subtitle_path)
$ffmpeg_path = "C:\Program Files\FFmpeg\bin\"
$bento4_path = "C:\Python27\Tools\Bento4-SDK\bin\"

cd $ffmpeg_path
$qualities = @("1280:720", "640:360")
for ($i = 0; $i -lt $qualities.length; $i++) {
  $params = [System.Collections.ArrayList]@()
  $params.Add("-i")
  $params.Add($file)

  if (!($file.Extension -eq '.mp4')) {
    $params.Add("-c:v")
    $params.Add("libx264")
    $params.Add("-c:a")
    $params.Add("aac")
    $params.Add("-b:a")
    $params.Add("192k")
  } else {
    $params.Add("-c:a")
    $params.Add("copy")
    $params.Add("-b:a")
    $params.Add("192k")
  }
  $params.Add("-ac")
  $params.Add("2")

  $params.Add("-preset")
  $params.Add("slower")

  $params.Add("-vf")
  $scale = "scale=" + $qualities[$i]
  if ($subtitle.Extension -eq '.srt') {
    Copy-Item $subtitle -Destination ".\"
    $srt = "subtitles=" + $subtitle.Name + "," + $scale
    $params.Add($srt)
  } elseif ($subtitle.Extension -eq '.ass') {
    Copy-Item $subtitle -Destination ".\"
    $ass = "subtitles=" + $subtitle.Name + "," + $scale
    $params.Add($ass)
  } else {
    $params.Add($scale)
  }

  $params.Add("-force_key_frames")
  $params.Add("expr:gte(t,n_forced*1)")
  $params.Add("-x264-params")
  $params.Add("rc-lookahead=1s:keyint=2s:min-keyint=1s")

  $output = "output-" + $i + ".mp4"
  .\ffmpeg @params $output

  Move-Item $output -Destination $bento4_path
  Write-Host @params
}
Remove-Item * -Include *.srt
Remove-Item * -Include *.ass
cd $bento4_path
.\mp4fragment --fragment-duration 2000 "output-0.mp4" "output-0-frgmnt.mp4"
.\mp4fragment --fragment-duration 2000 "output-1.mp4" "output-1-frgmnt.mp4"
.\mp4dash "output-0-frgmnt.mp4" "output-1-frgmnt.mp4" -o "E:\NAS-01-E\output"
Remove-Item * -Include *.mp4