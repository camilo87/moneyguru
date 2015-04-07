//--------------------------------------------------------------------------------
//
//  Módulo de pagamento - pedaços do código completo
//  Criado de acordo com o Revealing Module Pattern
//
//--------------------------------------------------------------------------------
guru.payment = (function(){
"use strict";

	function init()
	{
		// Define 'payment' como o módulo principal da aplicação
		guru.CURRENT_MODULE = "payment";
		formsValidation();
		getSessionToken();
		getBankName();
	};


	function formsValidation(){
		guru.validation.validate('#paymentCreditCard', {
			beforeSubmit: termsOfService,
			afterSubmit: function(result){
				location.href = "/comparador/consorcio/simulacao_consorcio/sucesso-checkout"+ location.search + '&paymentData=' + JSON.stringify(result.result.results);
			}
		});
		guru.validation.validate('#paymentBankSlip', {
			beforeSubmit: termsOfService,
			afterSubmit: function(result){
				location.href = "/comparador/consorcio/simulacao_consorcio/sucesso-checkout"+ location.search + '&paymentData=' + JSON.stringify(result.result.results);
			}
		});
			guru.validation.validate('#paymentDebit', {
			beforeSubmit: termsOfService,
			afterSubmit: function(result){
				location.href = "/comparador/consorcio/simulacao_consorcio/sucesso-checkout"+ location.search + '&paymentData=' + JSON.stringify(result.result.results);
			}
		});
	}


	function  getBankName()
	{
		$('.bankClass').click(function(){
			$('#idBankName').val($(this).attr('name'));
			$('.bankClass span').removeClass("selected");
			$('.bankClass a').removeClass("bankSelected");
			$(this).find("span").addClass("selected");
			$(this).find("a").addClass("bankSelected");
		});
	};

	
	function getSessionToken()
	{
		$.get('/tool/consortium/paywall/session-token',function(data){
			if (data.resultOk && data.resultCode=="OK_SUCCESS"){
				console.log(data.result.results[0].sessionToken);
				PagSeguroDirectPayment.setSessionId(data.result.results[0].sessionToken);
			}
			else{
				console.log(data);
				alert("Erro ao receber os dados. Por favor tente novamente.");
			}
		});
	};


	function generateCreditCardToken(){
		$('#cardHolderCVC').blur(function(){
			PagSeguroDirectPayment.createCardToken({ 
				cardNumber: $('#cardNumber').val(), 
				brand: $('#cardBrand').val(), 
				cvv: $('#cardHolderCVC').val(), 
				expirationMonth: $('#cardHolderValidMonth').val(), 
				expirationYear: $('#cardHolderValidYear').val(), 
				success: function(response) { 
					console.log('creditCardToken');
					$('#idCreditCardToken').val(response.card.token);
				}, 
				error: function(response) { 
					
					console.log(response);
				}
			});
			
		});
	};

	
	function getCreditCardBrand()
	{
		$('#cardNumber').blur(function(){
			PagSeguroDirectPayment.getBrand({ 
				cardBin: $('#cardNumber').val(), 
				success: function(response) {
					$('#cardBrand').val(response.brand.name);
					$('.dadosCartao ul li').removeClass("active");
					$('.dadosCartao ul li.'+$('#cardBrand').val()).addClass("active");
				}, 
				error: function(response) { 
					//tratamento do erro 
					console.log(response);
					$('.dadosCartao ul li.'+$('#cardBrand').val()).removeClass("active");
				}, 
				complete: function(response) { 
					//tratamento comum para todas chamadas 
				}
			});
		});
	};


	function getPaymentType()
	{
		$("#paymentButton").click(function(){
			var tabSelected = $('.tab.active').attr("rel");
			$('#'+tabSelected).submit();
		});
	}

	function fillAddress()
	{
		$('.inputCep').blur(function(){
			guru.request.getAddress($(this).val());
		});
	}

	function termsOfService() {
		if (!$("input[type=checkbox]").is(':checked')) {
			$(".tabs footer div.terms").addClass("termsOn");
			return false;
		}
		else {
			$(".tabs footer div.terms").removeClass("termsOn");
			return true;
		}
	}


	// Retorna apenas o que for público para o módulo
	return {
		init : init
	};

}()).init();