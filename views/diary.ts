import { Diary } from "letterboxd-api";

const REVIEW_CHARS = 150;

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December',
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#raw_strings
const html = (strings: TemplateStringsArray, ...values: any) => String.raw({ raw: strings }, ...values);

export default function diaryView(diaryList: Diary[], username: string): string {
    return html`

<style>
    #letterboxd-embed-tc {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        width: 100%;
        font-size: 0.5rem;
    }

    .letterboxd-embed-tc-diary-entry {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        padding: 0 .25rem;
    }

    .letterboxd-embed-tc-title {
        font-weight: bold;
        font-size: 1.1rem;
        margin-bottom: 0.05rem;
        text-align: left;
        line-height: normal;
    }

    .letterboxd-embed-tc-year {
        font-weight: normal;
        font-size: 0.8rem;
        margin-left: 0.0rem;
        color: #666;
    }

    .letterboxd-embed-tc-date {
        font-size: 0.9rem;
        margin-bottom: 0.1rem;
        color: #555;
    }

    .letterboxd-embed-tc-rating {
        color: #086a00;
        font-size: 1.2rem;
    }

    .letterboxd-embed-tc-review {
        margin-top: 0.2rem;
        font-size: 0.8rem;
        color: #555;
    }

    .letterboxd-embed-tc-divider {
        border-bottom: 1px solid #e6e6e6;
    }

    .letterboxd-embed-tc-poster img {
        border-radius: 0.25rem;
        max-width: unset;
    }

    .letterboxd-embed-tc-content {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        text-align: left;
    }

    .letterboxd-embed-tc-more {
        text-align: left;
    }
</style>

<style type="text/css" media="screen">
.imagecarousel {
  position: relative;
  height: 233px;
  margin-bottom: 30px;
  display: flex;
  width: fit-content;
  gap: 20px;
}

.imagecarousel img {
  margin: 0px 0px;
  box-shadow: 2px 2px 8px #8a8a8a;
}

.imagecarousel {
  animation: bannermove 50s linear infinite;
}

@keyframes bannermove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>

<div id="letterboxd-embed-tc">
    ${diaryList.map((diary, idx) => {
        const date = diary.date.watched ? new Date(diary.date.watched) : null;
        const dateString =  date ? `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` : '';

        const review = diary.review
            ? diary.review.substring(0, REVIEW_CHARS) + (diary.review.length > REVIEW_CHARS 
                ? '... [<a href="' + diary.uri + '" target="_blank">more</a>]' 
                : '')
            : '';

        return html`
        <div class="letterboxd-embed-tc-diary-entry">
            <div class="letterboxd-embed-tc-content">
                <div class="letterboxd-embed-tc-poster">
                    <div class="imagecarousel">
                    <a href="${diary.uri}" target="_blank">
                        <img src="${diary.film?.image?.small ?? ''}" alt="${diary.film.title} poster">
                    </a>
                    </div>
                </div>
            </div> 
        </div>
    `}).join('')}

</div>
`;
}