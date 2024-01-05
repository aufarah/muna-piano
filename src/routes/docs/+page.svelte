<style>
    h1{counter-reset: section; margin-top: 12pt;}
    h2{counter-reset: sub-section; margin-top: 12pt;}
    h3{counter-reset: composite; margin-top: 12pt;}
    h4{counter-reset: detail; margin-top: 12pt;}
 
    h2:before{
      counter-increment: section;
      content: counter(section) ". ";
    }
    h3:before{
      counter-increment: sub-section;
      content: counter(section) "." counter(sub-section) ". ";
    }
    h4:before{
      counter-increment: composite;
      content: counter(section) "." counter(sub-section) "." counter(composite) ". ";
    }
    h5:before{
      counter-increment: detail;
      content: counter(section) "." counter(sub-section) "." counter(composite) "." counter(detail) ". ";
    }

    h1 ~ *:not(h1) {
     margin-left: 1.2rem;
    }
    h2 ~ *:not(h1, h2) {
        margin-left: 2.4rem;
    }
    h3 ~ *:not(h1, h2, h3) {
        margin-left: 3.6rem;
    }

    p{
        margin-bottom: 12pt;
    }

    </style>


<svelte:head>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import Wheel from '../../lib/components/WheelDummy.svelte';
    onMount(() => {
		
		let script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js";
    document.head.append(script);
		
		script.onload = () => {
      MathJax = {
        tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
        svg: {fontCache: 'global'}
      };
		};
					  
	});
    </script>
<div class="m-4">
    <h1>Getting Started</h1>
        <p>We will exploring how to tune our Munta Piano, and then play it.</p>
        <h2>Tune your own Instrument</h2>
            <h3>Introduction</h3>
                <p>
                    Suppose we're a musician or a composer that want to play or create a musical piece of our own. Our music obviously consisted of set of notes, where each notes has its own sound, frequency. The activity to choose whatever notes available to be chosen is called <strong>Tuning</strong>. The set of notes that we will used, in orderly manner, is called <strong>Scale</strong>.
                </p>
                <details>
                    <summary>Simplified definition of Tuning</summary>
                    <p>Tuning is a process to find scale, which is set of notes that will be played/used.</p>
                </details>
            <h3>Understanding Scale</h3>
                <p>
                    Scale, simply said, is just a collection of musical notes sorted either from lowest or highest. Note is a smallest component in music, each with its own audio frequency. Figure below show a famous scale of "C Major" written in Western Notation:
                </p>
                <div class="figure">
                    <div class="flex-col sm:flex-row flex gap-x-2">
                        <img src="https://upload.wikimedia.org/score/1/4/149hxowm0jnjun0byp4xzvq7h12ndfg/149hxowm.png" alt="A Major scale"/>
                        <audio controls>
                            <source src="//upload.wikimedia.org/score/1/4/149hxowm0jnjun0byp4xzvq7h12ndfg/149hxowm.mp3" type="audio/mpeg">
                            <div>Audio playback is not supported in your browser. You can <a href="//upload.wikimedia.org/score/1/4/149hxowm0jnjun0byp4xzvq7h12ndfg/149hxowm.mp3">download the audio file</a>.</div>
                        </audio>
                    </div>
                </div>

                <h4>Scale Ratio</h4>
                    <p>
                        C Major consists of these notes: "C,D,E,F,G,A,B", and after that the notes will be repeated again with "C,D,E,.." but on higher pitch. A <strong>Scale ratio</strong> or <strong>interval of equivalence</strong> is a ratio between the frequency of a notes versus the previous same notes but on lower pitch, for example between C4 and C3, or between D5 and D4. Formally we can write these, with {`\$n\$`} is a scale step number:
                        {`\\[
                            Scale\\_ratio = Note_{frequency}^{n} : Note_{frequency}^{n-1}
                        \\]`}
                        Most common value for Scale ratio are 2 (named as octave, diapason, or ditave) or 3 (tritave). If the value is an integer, the higher note is the harmonic of lower same notes. There's an interesting phenomenon about this: On commonly tuned guitar if we pluck higher E string (E4), the lower E string (E2) magically get vibrating too.
                    </p>
                <h4>Interval</h4>
                    <p>
                        When we listen to two different notes, we perceived one note there is higher than the other one and there's a gap between them, an interval. How can we describe the interval between two notes? We already know that a scale is repeating like a circle, let's map the C Major scale into a circular chart:
                    </p>
                    <div class="figure">
                        <div class="p-8 pb-4 bg-chocomilk w-fit rounded-xl flex flex-col">
                            <Wheel radius=100 division=12 root=0 note_list={[
                                    {value:0,name:'c'},
                                    {value:2,name:'d'},
                                    {value:4,name:'e'},
                                    {value:5,name:'f'},
                                    {value:7,name:'g'},
                                    {value:9,name:'a'},
                                    {value:11,name:'b'}]}/>
                        </div>
                        <span class="caption">Circle of Major Scale started from C</span>
                    </div>


                    <p>
                        It seems like a full 360 degree protractor. We can clearly see that the angle between note C and D is 60 degree, or between C and A is 90 degree. Now we can describe more clearly the interval between notes in degree as measuring unit. There are other options too beside using degree, just like there are many units for measuring distance : meter, feet, kilometer, and so on.
                    </p><p>
                        The most popular units on describing interval are <strong>Cents</strong> and <strong>Semitone</strong>. When using degree unit we divide full circle into 360 steps; when using cents 1200 steps; and when using semitones 12 steps.
                    </p>
                <h4>Base Note and Frequency</h4>
                    <p>Since scale is circular we can choose anywhere as a start point, as a base or root. For example on previous figure, the scale is started from C. In Muna Piano, we can pick the base note by rotating the wheel arrow. We then can assign a specific frequency to that base note by changing the value of <strong>Base Frequency (Hz)</strong> below the Tuning config.</p>
                <h4>Mode</h4>
                    <p>There's another keyword here that interchangebly used with scale: <strong>Mode</strong>. There're a lot of different defintion of Mode, but here we can simply say that <strong>a Mode is a scale minus the base frequency tuned there</strong>, practically a template for scale. From a same Mode there can be many scale of music available, for example the Major mode can be started from C, D, or E, and so on; if it's started from C it's called as C Major Scale.</p>
                    <div class="figure">
                        <div class="flex flex-row gap-4">
                            <div class="p-8 pb-4 bg-chocomilk w-fit rounded-xl flex flex-col">
                                <Wheel radius=100 division=12 root=0 note_list={[
                                        {value:0,name:'c'},
                                        {value:2,name:'d'},
                                        {value:4,name:'e'},
                                        {value:5,name:'f'},
                                        {value:7,name:'g'},
                                        {value:9,name:'a'},
                                        {value:11,name:'b'}]}/>
                            </div>
                            <div class="p-8 pb-4 bg-chocomilk w-fit rounded-xl flex flex-col">
                                <Wheel radius=100 division=12 root=0 note_list={[
                                    {value:0,name:'d'},
                                    {value:2,name:'e'},
                                    {value:4,name:'f#'},
                                    {value:5,name:'g'},
                                    {value:7,name:'a'},
                                    {value:9,name:'b'},
                                    {value:11,name:'c#'}]}/>
                            </div>
                        </div>

                        <span class="caption">C Major scale and D Major scale are share the same Mode: Major mode</span>
                    </div>
                    <p>Muna Piano already has a preconfigurated mode, which is under <strong>Tuning Palette</strong> submenu.</p>
</div>
