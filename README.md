# Ready-Set-Hire [ready-set-hire](https://github.com/UniversalTze/Interview-React/tree/main/ready-set-hire)
ReadySetHire is a modern web application designed to streamline the hiring
process. It is a demo web application that can provides recruiters with an easy way to set up interviews, add
interview questions, invite applicants, and automatically capture their spoken
responses through speech-to-text transcription. By using the latest AI
technology, ReadySetHire allows applicants to answer naturally in spoken
language, making the experience more authentic and efficient.
Was built according to the spec found [here](https://github.com/UniversalTze/Interview-React/tree/main/Spec). 

Users can: 
- Create, edit, and delete Interviews
- Add interview questions
- Invite applicants through unique interview links
- Applicants answer using an audio recorder, with AI transcription converting speech to text
- One question per page interview flow for clarity and focus
- Track interview status (Not Started and Completed)
- Review Applicant question answers
  
## Tech Stack
- Frontend: Javascript + HTML and CSS (Bootstrap Framework). Also uses React -> (React Router) and Vite (Frontend tooling for effiecient building and dev server).
- Audio Transcriber: Hugging Face Transformer [more-info](https://huggingface.co/docs/transformers/en/index). 
- Backend: PostgREST and Postgres.
- Packaga Manager: Node

## Instructions
1. Clone the repo using this: `Git clone https://github.com/UniversalTze/Interview-React`
2. Navigate into ready-set-hire folder. `cd ready-set-hire`
3. Ensure and run this script: `./launch.sh`
4. Enjoy the demo!
5. A cleanup script can be found in repo in "ready-set-hire" directory. So run `cd ready-set-hire` and then `./cleanup.sh`

   
## Author
Tze Kheng Goh

