import chrome from 'chrome-aws-lambda'

interface Options {
  args: string[]
  executablePath: string
  headless: boolean
}

const chromeExecPaths = {
  win32: '',
  linux: '/usr/bin/google-chrome',
  darwin: ''
}

const execPath = chromeExecPaths[process.platform as keyof typeof chromeExecPaths]

export async function getOptions(isDev: boolean): Promise<Options> {
  let options: Options

  if (isDev) {
    options = {
      args: [],
      executablePath: execPath,
      headless: true
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  }

  return options
}
