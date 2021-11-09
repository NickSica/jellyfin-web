import { appRouter } from '../components/appRouter';
import cardBuilder from '../components/cardbuilder/cardBuilder';
import dom from '../scripts/dom';
import globalize from '../scripts/globalize';
import { appHost } from '../components/apphost';
import layoutManager from '../components/layoutManager';
import focusManager from '../components/focusManager';
import '../elements/emby-itemscontainer/emby-itemscontainer';
import '../elements/emby-scroller/emby-scroller';
import ServerConnections from '../components/ServerConnections';

/* eslint-disable indent */
/*
    function buildJWT() {
        let request = new XMLHttpRequest();
        request.open("POST", "https://nisicalab.com/requests/api/v1/token/");
        request.setRequestHeader("Referer", "https://nisicalab.com/requests/login");
        let payload = {
            "password":,
            "username":,
            "rememberMe":false,
            "usePlexOAuth":false,
            "plexTvPin":{"id":0,"code":""},
        };
        request.send(payload);
    }
*/
    function createView(instance, elem, apiClient) {
        let html = '';

        html += '<div class="pageTabContent" id="requestsTab" data-index="2">';

        if (layoutManager.tv) {
            html += '<h2 class="sectionTitle sectionTitle-cards">' + globalize.translate(section.name) + '</h2>';
        } else {
            //html += '<a is="emby-linkbutton" href=localhost:5000 class="more button-flat button-flat-mini sectionTitleTextButton">';
            html += '<h2 class="sectionTitle sectionTitle-cards">';
            html += globalize.translate('Requests');
            html += '</h2>';
            html += '<span class="material-icons chevron_right"></span>';
            html += '</a>';
        }

        html += '</div>';
        html += '<iframe src="https://nisicalab.com/requests" width="100%" height="850px"></iframe>'
        html += '<div is="emby-scroller" class="padded-top-focusscale padded-bottom-focusscale" data-centerfocus="true"><div is="emby-itemscontainer" class="itemsContainer scrollSlider focuscontainer-x" data-monitor="markfavorite"></div></div>';
        html += '</div>';

        elem.innerHTML = html;
        window.CustomElements.upgradeSubtree(elem);
    }

class ResultsTab {
    constructor(view, params) {
        this.view = view;
        this.params = params;
        this.apiClient = ServerConnections.currentApiClient();
        this.contentContainer = view.querySelector('.content');
        createView(this, this.contentContainer, this.apiClient);
    }

    onResume(options) {
        const promises = (this.apiClient, []);
        const view = this.view;
        const elems = this.contentContainer.querySelectorAll('.itemsContainer');
        //buildJWT();

        for (const elem of elems) {
            promises.push(elem.resume(options));
        }

        Promise.all(promises).then(function () {
            if (options.autoFocus) {
                focusManager.autoFocus(view);
            }
        });
    }

    onPause() {
        const elems = this.sectionsContainer.querySelectorAll('.itemsContainer');

        for (const elem of elems) {
            elem.pause();
        }
    }

    destroy() {
        this.view = null;
        this.params = null;
        this.apiClient = null;
        const elems = this.sectionsContainer.querySelectorAll('.itemsContainer');

        for (const elem of elems) {
            elem.fetchData = null;
            elem.getItemsHtml = null;
            elem.parentContainer = null;
        }

        this.sectionsContainer = null;
    }
}

export default ResultsTab;

/* eslint-enable indent */
