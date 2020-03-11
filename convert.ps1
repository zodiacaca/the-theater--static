$file_path = "Chernobyl\Chernobyl.mkv"
$subtitle_path = "Chernobyl\Chernobyl (1).srt"
$output_path = "E:\NAS-01-E\"
$file = [System.IO.DirectoryInfo]($output_path + $file_path)
$subtitle = [System.IO.DirectoryInfo]($output_path + $subtitle_path)
$ffmpeg_path = "C:\Program Files\FFmpeg\bin\"
$bento4_path = "C:\Python27\Tools\Bento4-SDK\bin\"

cd $ffmpeg_path
$qualities = @("1280:720", "640:360")
for ($i = 0; $i -lt $qualities.length; $i++) {
  $params = [System.Collections.ArrayList]@()

  $params.Add("-i")
  $params.Add($file)

  $params.Add("-s")
  $params.Add($qualities[$i])

  if (!($file.Extension -eq '.mp4')) {
    $params.Add("-f")
    $params.Add("mp4")
    $params.Add("-c:v")
    $params.Add("libx264")
    $params.Add("-c:a")
    $params.Add("aac")
    $params.Add("-b:a")
    $params.Add("192k")
    $params.Add("-strict")
    $params.Add("experimental")
  } else {
    $params.Add("-c:a")
    $params.Add("copy")
    $params.Add("-b:a")
    $params.Add("192k")
  }

  if ($subtitle.Extension -eq '.srt') {
    Copy-Item $subtitle -Destination ".\"
    $srt = "subtitles=" + $subtitle.Name
    $params.Add("-vf")
    $params.Add($srt)
  } elseif ($subtitle.Extension -eq '.ass') {
    Copy-Item $subtitle -Destination ".\"
    $ass = "subtitles=" + $subtitle.Name
    $params.Add("-vf")
    $params.Add($ass)
  }

  $params.Add("-force_key_frames")
  $params.Add("expr:gte(t,n_forced*1)")

  $output = "output-" + $i + ".mp4"
  .\ffmpeg-hi10-heaac @params $output

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