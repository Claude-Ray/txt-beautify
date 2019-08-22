/**
 * beautify file by path
 */
export = async (filepath: string, outpath: string) => {
  let beautifier: any
  try {
    require.resolve('worker_threads')
    beautifier = await import('./worker-thread')
  } catch {
    beautifier = await import('./single-process')
  }
  // XXX: ES6 modules!
  return beautifier.default(filepath, outpath)
}
