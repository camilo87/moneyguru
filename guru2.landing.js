/*
 * Módulo da landing
 * Criado de acordo com o Revealing Module Pattern
 */
guru2.landing = (function(){
	'use strict';
	
	/**
	 * Método 'construtor'
	 */
	function init()
	{
		// Define 'telecom' como o módulo principal da aplicação
		guru2.CURRENT_MODULE = "telecom";

		guru2.request.getJson('/telecomList.json', function(data){
			var RANGES = data.ranges;

			for (var i=0; i<RANGES.length; i++)
			{
				// preenche a lista de navegação com os ranges
				var rangeNavigation = '<li><a class="'+RANGES[i].rangeName+' tab" rel="'+RANGES[i].rangeName+'"></li>';

				$('.plans nav ul').append(rangeNavigation);
				$('.plans nav ul li a').eq(0).addClass("active");
				$('.plans nav ul li a[rel="'+RANGES[i].rangeName+'"]').text(RANGES[i].range);

				// preenche a lista de opções de cada range
				$('.plans section.'+RANGES[i].rangeName+'').append(guru2.template.render($("#combosList").html(), RANGES[i].options));
			}
		});

		// Envio do formulário do lead simples (abertura da página OU após o clique do botão 'Eu Quero')
		guru2.validation.validate('#lead-simple-form', {
			afterSubmit: function() {

				var dataLayerEvent = {
					'event'				: 'lead-simple',
					'Product'			: 'Telecom',
					'Product-type'		: 'Telecom',
					'Name'				: $('.overlay input[name=s_user_name]').val(),
					'E-mail'			: $('.overlay input[name=s_user_email]').val(),
				}

				// Geração da métrica
				dataLayer.push(dataLayerEvent);

				// Fechamento do modal
				guru2.modal.closeModal();

				guru2.cookie.setCookie('splashStatus', '2', 60);
			}
		});

		leadSimple();
		productEngagement();
		handpick();
	};

	function handpick()
	{
		$(document).on("click", 'a.callbutton_small', function(e){

			var $button = $(this);

			var dataLayerEvent = {
				'event'				: 'handpick',
				'Product'			: 'Telecom',
				'Name'				: $('#s_user_name').val(),
				'E-mail'			: $('#s_user_email').val(),
				'id'				: $(this).attr('data-id'),
				'cabletvProvider'	: $(this).attr('data-provider'),
				'Price'				: $(this).attr('data-price'),
				'redirectUrl'		: '/comparador/telecom/confirmacao?id='+$(this).attr('data-id')
			}

			// Geração da métrica
			dataLayer.push(dataLayerEvent);
		});
	}

	return {
		init				: init,
		leadSimple			: leadSimple,
		productEngagement	: productEngagement,
		handpick			: handpick
	};
	
}());

guru2.landing.init();