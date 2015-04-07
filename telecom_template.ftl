<template id="combosList">
	<div>
		<div class="provider">
			<div class="brand">
				<img src="${IMG_PATH}/operadoras/<#noparse>{{nomeImagem}}</#noparse>.png" />
			</div>
			<div>
				<#noparse>{{planName}}</#noparse>
			</div>
		</div>
		<div class="price">
			<span class="currency">R$ </span><#noparse>{{price}}</#noparse><br>
			<span class="featureLabels">por mês</span>
		</div>
		<div class="internetSpeed">
			<#noparse>{{internetSpeed}}</#noparse>
			<span class="featureLabels">velocidade</span>
		</div>
		<div class="tvChannels">
			<div>
				<#noparse>{{channelsTotal}}</#noparse>
				<span class="featureLabels">canais</span>
			</div>
			<div>
				<#noparse>{{channelsHDTotal}}</#noparse>
				<span class="featureLabels">canais HD</span>
			</div>
		</div>
		<div class="landMinutes">
			<#noparse>{{landMinutes|fillBlanks}}</#noparse>
		</div>
		<#if type="landing">
			<div class="calltoAction">
				<a data-id="{{id}}" data-provider="{{cableProvider}}" data-price="{{price}}" class="callbutton_small">solicite</a>
			</div>
		<#else>
		</#if>
	</div>
</template>