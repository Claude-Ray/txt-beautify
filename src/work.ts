import { parentPort } from 'worker_threads'

const CRLF = '\r\n\r\n'

// @ts-ignore
parentPort.on('message', (lines: string[] | string) => {
  if (lines === 'exit') return process.exit()

  const data: string[] = []

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue
    trimmedLine.split(/\s{2,}/)
      // tslint:disable-next-line
      .forEach(str => data.push(`　　${str}`))
  }

  const trimmedLines = data.join(CRLF) + CRLF

  // @ts-ignore
  parentPort.postMessage(trimmedLines)
})
