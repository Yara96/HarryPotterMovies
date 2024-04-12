export class Movie{

     id: string = "";
     title: string = "";
     duration: string = "";
     budget: string = "";
     release_date: string = "";
     box_office: string = "";
     cinematographers: string[] = [];
     poster: string = "";
     producers: string[] = [];
     summary: string = "";

    constructor(data: Partial<Movie>){
        this.id = data.id ?? this.id;
        this.title = data.title ?? this.title;
        this.duration = data.duration ?? this.duration;
        this.budget = data.budget ?? this.budget;
        this.release_date = data.release_date ?? this.release_date;
        this.box_office = data.box_office ?? this.box_office;
        this.cinematographers = data.cinematographers ?? this.cinematographers;
        this.poster = data.poster ?? this.poster;
        this.producers = data.producers ?? this.producers;
        this.summary = data.summary ?? this.summary;

    }
}