How would a programmer interpret "Inception" (Spoiler)
======================================================

date
:   2010-08-17 09:22

author
:   admin

category
:   Graffiti\_涂鸦

tags
:   Inception, LYZ, movie, Spoiler, 剧透

slug
:   how-would-a-programmer-interpret-inception-spoiler

***[LYZ](http://www.google.com/profiles/118159917586472505008#buzz)作品：***

public void main()\
 {\
 Leader Cobb; Pointman Arthur; Client Saito; Architect Ariadne;\
 Target Fischer;\
 Forger Eames; Chemist Yusuf;

/\* Saito hire Cobb to perform inception on Fischer, inception team\
 formed and they get on the plane \*/\
 new Thread(Yusuf.dream(Cobb, Arthur, Saito, Ariadne, Fischer,\
 Eames)).start();\
 Thread.sleep( a few hours );\
 kickall();

}

Yusuf.dream(Cobb, Arthur, Saito, Ariadne, Fischer, Eames)\
 {\
 /\* kidnap Fischer, interrupted by Fischer’s guards, etc. They get on\
 the van for the next level dream \*/\
 new Thread(Arthur.dream(Cobb, Saito, Ariadne, Fischer,\
 Eames)).start();\
 this.drive\_like\_crazy();\
 this.plunge\_into\_water();\
 on\_kicked(this.kick\_all());\
 }

| Arthur.dream(Cobb, Saito, Ariadne, Fischer, Eames) | { | /\* Hotel
scene, convince Fischer that he is under dream invasion, etc. | They
pretend to go into Browning’s dream, who is actually Eames \*/ | new
Thread(Eames.dream(Cobb, Saito, Ariadne, Fischer)).start(); |
this.fight\_guards(); | this.move\_all\_to\_elevator(); |
on\_kicked(this.kick\_all()); | }

| Eames.dream(Cobb, Saito, Ariadne, Fischer) | { | /\* Infiltrate Snow
mountain base, shootout MW2 style, etc. Fischer got | shot and went
unconscious \*/ | new Thread(Cobb.dream(Ariadne, Fischer)).start(); |
this.fight\_guards(); | Saito.dead(); | new
Thread(Saito.limbo()).start(); | on\_kicked(this.kick\_all()); | }

Cobb.dream(Ariadne, Fischer)\
 {\
 /\* Talk to wife Mal, blah blah, wife stabbed Cobb \*/\
 on\_kicked(this.kick\_all());\
 Cobb.dead();\
 new Thread(Cobb.limbo()).start();\
 }

Saito.limbo()\
 {\
 this.wait();\
 return;\
 }

Cobb.limbo()\
 {\
 this.find(Saito);\
 Saito.notify();\
 return;\
 }
