import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Typed, { TypedOptions } from 'typed.js';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.scss',
})
export class TypewriterComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private cdref: ChangeDetectorRef) {}

  @ViewChild('typewriter') typewriterElement!: ElementRef;

  typedInstance!: Typed;
  titles = [
    "بِدِّي شَعْرَةً مِنُّه",
    "روح الروح, هذى روح الروح",
    "والله ياما أخذت ٥٨٠ إبرة عشانه",
    "هَي أِمَّي.. بَعْرِفْها مِن شَعْرَهَا",
    "مَتْعَيَطِش يا زلَمِة, كِلنْا مَشروع شُهداء",
    "مَعْلِش..",
    "أمَانة يا خال نِفْسي أشوفه",
    "يَابَا, مِش كَانَ بِدَّك تِطْلَع صَحَفِي؟",
    "سَبَع سِنِين شَعْرُه أبْيَض وكيرلي وحِلو",
    "كُنْتَ نَاوِي اعْمِلَّهَا عِيدَ مِيلَادٍ",
    "مِين ضَلَّ عَايَشَ؟!",
    "بِدِّي أَلْعَب, بِدِّي أَلْعَب بَسْ",
    "خَلِّية فِي حُضْنِي, خَلِّية فِي حُضْنِي",
    "ماما أنا تِعِبْت من هذا الصوت",
  ];



  ngOnInit() {
  }

  ngAfterViewInit() {

      this.initializeTyped();
      this.cdref.detectChanges();
  }

  ngOnDestroy() {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }

  initializeTyped() {
    const options: TypedOptions = {
      strings: this.titles,
      typeSpeed: 30,
      backSpeed: 20,
      backDelay: 2500,
      startDelay: 2000,
      loop: true,
      showCursor: false,
    };

    this.typedInstance = new Typed('.typed-element', options);
  }
}
