# A notation for music generation

## Structure
- It should have or refer to some instrument setting
    - The Instrument Setting should have or refer to some tuning setting; each instrument has its own tuning
        - The Tuning follow up notation of './src/definition/scale.json'
        - added: user can create alias for each note. For example the 1st note is assigned letter 'a'
    - An instrument is defined as is in ToneJS implementation
- A metadatas:
    - Owner, name,
- Global parameter: 
    - tempo, timesignature, volume
    - device: L speaker, R speaker, etc?
- It should contain certain track, each track contains :
    - list of note that want to be played; when; how long
    - instrument associated
    - device associated
All of them will be written in XML, each element can have ID and CLASS as if in HTML.

## Example
-> on different file