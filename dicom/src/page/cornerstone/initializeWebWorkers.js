// This script will load the WebWorkers and Codecs from unpkg url
export default function(cwil){
  try {
    cwil.webWorkerManager.initialize({
      maxWebWorkers: 4,
      startWebWorkersOnDemand: true,
      webWorkerTaskPaths: [],
      taskConfiguration: {
        decodeTask: {
          initializeCodecsOnStartup: false,
          usePDFJS: false,
          strict: true
        }
      }
    });
  } catch (error) {
    throw new Error('cornerstoneWADOImageLoader is not loaded');
  }
}


