import Tone from 'tone'
import DrumsService from './DrumsService';

export default class MusicService {
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    scales = {
        "Minor": [0, 2, 3, 5, 7, 8, 10],
        "Major": [0, 2, 4, 5, 7, 9, 11],
        "Pentatonic Minor": [0, 3, 5, 7, 8],
        "Pentatonic Major": [0, 2, 4, 7, 9],
    };
    time = 0;
    timeIndex = -1;
    measure = 16;
    transport = Tone.Transport;

    constructor(tonic, scale, bpm) {
        this.tonic = tonic;
        this.tonicIndex = this.notes.indexOf(tonic);
        this.scale = scale;
        this.transport.bpm.value = bpm;
        this.transport.scheduleRepeat(
            (time) => {
                this.repeat(time);
            }, "8n");
        // this.transport.start();
    }
    repeat(time) {
        this.timeIndex = (this.timeIndex + 1) % this.measure;
    }

    changeTonic(newTonic) {
        this.tonicIndex = this.notes.indexOf(newTonic);
        this.tonic = newTonic;
    }
    randomTonic(){
        let randIndex = Math.floor(Math.random() * this.notes.length);
        this.tonicIndex = randIndex;
        this.tonic = this.notes[this.tonicIndex];
        this.tonic = newTonic;
    }
    changeScale(newScale) {
        // let keys = Object.keys(this.scales);
        // let newScale = this.scale;
        // while (newScale == this.scale) {
        //     newScale = keys[Math.floor(Math.random() * keys.length)];
        // }
        this.scale = newScale;
    }
    getNote(index, octave) {
        let notes = []
        if(index.length > 0) {
            for(let i of index){
                let octaves = octave + Math.floor(i / this.scales[this.scale].length);
                let noteIndex = this.scales[this.scale][i % this.scales[this.scale].length] + this.tonicIndex;
                let newOctave = octaves + Math.floor(noteIndex / this.notes.length);
                notes.push(this.notes[noteIndex % this.notes.length] + newOctave);
            }
        }
        return notes;
    }
    toggleStartPause() {
        if (this.transport.state == "started") {
            this.transport.pause();
        }
        else {
            this.transport.start();
        }
    }
    stop() {
        this.timeIndex = -1;
        this.transport.stop();
    }
}