import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Parar e limpar o stream de áudio
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop())
      audioStreamRef.current = null
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')

    try {
      const response = await fetch(`/api/rooms/${params.roomId}/audio`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Falha ao enviar o áudio')
      }
      const result = await response.json()
      console.log('Áudio enviado com sucesso:', result)
    } catch (error) {
      console.error('Erro ao enviar o áudio:', error)
    }
  }

  function createRecorder(audio: MediaStream, isInitialRecording = false) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada')
      if (isInitialRecording) {
        setIsRecording(true)
      }
    }

    recorder.current.onstop = () => {
      console.log('Gravação parada')
      // Não alterar o estado isRecording aqui, apenas quando parar manualmente
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Gravação de áudio não é suportada neste navegador.')
      return
    }

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    audioStreamRef.current = audio
    createRecorder(audio, true)

    intervalRef.current = setInterval(() => {
      if (recorder.current && recorder.current.state === 'recording') {
        recorder.current.stop()
        createRecorder(audio, false)
      }
    }, 5000)
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-2xl">Record Room Audio</h1>
        {isRecording ? (
          <Button onClick={stopRecording}>Parar gravação</Button>
        ) : (
          <Button onClick={startRecording}>Gravar áudio</Button>
        )}
        {isRecording ? (
          <p>Gravando...</p>
        ) : (
          <p>Clique no botão para iniciar a gravação</p>
        )}
      </div>
    </div>
  )
}
