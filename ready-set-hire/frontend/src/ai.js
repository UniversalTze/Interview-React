import { pipeline, env } from '@huggingface/transformers';

/**
 * Configure Hugging Face Transformers environment:
 * - Disable local model loading to ensure the model is fetched remotely.
 * - Disable browser cache to avoid stale models.
 */
env.allowLocalModels = false;
env.useBrowserCache = false;

/** 
 * Private variable to cache the ASR (Automatic Speech Recognition) pipeline instance.
 * Ensures the model is only loaded once per session.
 */

let _asr = null;

/**
 * Returns a singleton instance of the Whisper ASR pipeline.
 * Uses the "Xenova/whisper-base" model to transcribe audio to text.
 *
 * @async
 * @function getTranscriber
 * @returns {Promise<Function>} - A callable ASR pipeline function that accepts audio data and options
 *
 * @example
 * const transcriber = await getTranscriber();
 * const result = await transcriber(audioData, { language: "en", task: "transcribe" });
 * console.log(result.text);
 */
export async function getTranscriber() {
  if (!_asr) {
    _asr = await pipeline(
      'automatic-speech-recognition',
      'Xenova/whisper-base'
    );
  }
  return _asr;
}