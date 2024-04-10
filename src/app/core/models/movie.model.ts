export class Movie{

    readonly id: string = "";
    readonly title: string = "";
    readonly duration: string = "";
    readonly budget: string;
    readonly release_date: string;
    readonly box_office: string;
    readonly cinematographers: string[];
    readonly poster: string;
    readonly producers: string[];
    readonly summary: string;

    constructor(data: Partial<Movie>){
        this.id = data.id;
        this.title = data.title;
        this.duration = data.duration;
        this.budget = data.budget;
        this.release_date = data.release_date;
        this.box_office = data.box_office;
        this.cinematographers = data.cinematographers;
        this.poster = data.poster;
        this.producers = data.producers;
        this.summary = data.summary;

    }
}