import type {
	ApplicationInterfaceDataVO,
	ApplicationInterfaceMethodDataVO,
	ApplicationInterfaceMethodVO,
	ApplicationInterfaceVO,
	ApplicationSystemDataVO,
	ApplicationSystemRichInfo,
	ApplicationSystemVO,
	GatewayDistributionDataVO,
	GatewayDistributionVO,
	GatewayServerDataVO,
	GatewayServerDetailDatalVO,
	GatewayServerDetailVO,
	GatewayServerVO,
	RedisConfig,
} from "@/types/gateway";
import { del, get, post, put, type ApiResponse, type PageData } from "../api";
import { PORT_GATEWAY_CENTER } from "./config";

/**
 * 数据操作管理 API
 */

// 查询网关服务数据
export async function queryGatewayServer(
	groupId: string,
	page: string,
	limit: string
): Promise<ApiResponse<PageData<GatewayServerDataVO>>> {
	return get<PageData<GatewayServerDataVO>>(PORT_GATEWAY_CENTER + "/api/v1/gateway-servers", {
		params: { groupId, page, limit },
	});
}

// 查询网关服务详情数据
export async function queryGatewayServerDetail(
	groupId: string,
	page: string,
	limit: string,
	gatewayId?: string
): Promise<ApiResponse<PageData<GatewayServerDetailDatalVO>>> {
	return get<PageData<GatewayServerDetailDatalVO>>(PORT_GATEWAY_CENTER + "/api/v1/gateway-servers/details", {
		params: { groupId, gatewayId, page, limit },
	});
}

// 查询网关分配数据
export async function queryGatewayDistribution(
	page: string,
	limit: string,
	groupId?: string,
	gatewayId?: string
): Promise<ApiResponse<PageData<GatewayDistributionDataVO>>> {
	return get<PageData<GatewayDistributionDataVO>>(PORT_GATEWAY_CENTER + "/api/v1/gateway-servers/distributions", {
		params: { groupId, gatewayId, page, limit },
	});
}

// 查询应用系统信息
export async function queryApplicationSystem(
	page: string,
	limit: string,
	systemId?: string,
	systemName?: string
): Promise<ApiResponse<PageData<ApplicationSystemDataVO>>> {
	return get<PageData<ApplicationSystemDataVO>>(PORT_GATEWAY_CENTER + "/api/v1/gateway-servers/application-systems", {
		params: { systemId, systemName, page, limit },
	});
}

// 查询应用接口信息
export async function queryApplicationInterface(
	page: string,
	limit: string,
	systemId?: string,
	interfaceId?: string
): Promise<ApiResponse<PageData<ApplicationInterfaceDataVO>>> {
	return get<PageData<ApplicationInterfaceDataVO>>(PORT_GATEWAY_CENTER + "/api/v1/gateway-servers/application-interfaces", {
		params: { systemId, interfaceId, page, limit },
	});
}

// 查询应用接口方法信息
export async function queryApplicationInterfaceMethod(
	page: string,
	limit: string,
	systemId?: string,
	interfaceId?: string
): Promise<ApiResponse<PageData<ApplicationInterfaceMethodDataVO>>> {
	return get<PageData<ApplicationInterfaceMethodDataVO>>(PORT_GATEWAY_CENTER + "/api/v1/gateway-servers/application-interfaces/methods", {
		params: { systemId, interfaceId, page, limit },
	});
}

/**
 * 网关配置管理 API
 */

// 查询网关服务配置项
export async function queryServerConfig(): Promise<ApiResponse<GatewayServerVO[]>> {
	return get<GatewayServerVO[]>(PORT_GATEWAY_CENTER + "/api/v1/config/gateway-servers");
}

// 查询网关算力节点配置项
export async function queryServerDetailConfig(): Promise<ApiResponse<GatewayServerDetailVO[]>> {
	return get<GatewayServerDetailVO[]>(PORT_GATEWAY_CENTER + "/api/v1/config/gateway-server-details");
}

// 查询网关分配配置项
export async function queryGatewayDistributionList(): Promise<ApiResponse<GatewayDistributionVO[]>> {
	return get<GatewayDistributionVO[]>(PORT_GATEWAY_CENTER + "/api/v1/config/gateway-distributions");
}

// 注册网关服务节点
export async function registerGatewayServerNode(
	groupId: string,
	gatewayId: string,
	gatewayName: string,
	gatewayAddress: string
): Promise<ApiResponse<boolean>> {
	return post<boolean>(PORT_GATEWAY_CENTER + "/api/v1/config/gateway-servers", null, {
		params: { groupId, gatewayId, gatewayName, gatewayAddress },
	});
}

// 网关算力与系统挂载配置
export async function distributionGatewayServerNode(
	groupId: string,
	gatewayId: string,
	systemId: string
): Promise<ApiResponse<boolean>> {
	return post<boolean>(PORT_GATEWAY_CENTER + "/api/v1/config/gateway-distributions", null, {
		params: { groupId, gatewayId, systemId },
	});
}

// 查询应用服务配置项
export async function queryApplicationSystemList(): Promise<ApiResponse<ApplicationSystemVO[]>> {
	return get<ApplicationSystemVO[]>(PORT_GATEWAY_CENTER + "/api/v1/config/application-systems");
}

// 查询应用接口配置项
export async function queryApplicationInterfaceList(): Promise<ApiResponse<ApplicationInterfaceVO[]>> {
	return get<ApplicationInterfaceVO[]>(PORT_GATEWAY_CENTER + "/api/v1/config/application-interfaces");
}

// 查询应用接口方法配置项
export async function queryApplicationInterfaceMethodList(): Promise<ApiResponse<ApplicationInterfaceMethodVO[]>> {
	return get<ApplicationInterfaceMethodVO[]>(PORT_GATEWAY_CENTER + "/api/v1/config/application-interface-methods");
}

// 查询分配到网关下的待注册系统信息
export async function queryApplicationSystemRichInfo(
	gatewayId: string,
	systemId: string
): Promise<ApiResponse<ApplicationSystemRichInfo>> {
	return get<ApplicationSystemRichInfo>(PORT_GATEWAY_CENTER + "/api/v1/config/application-systems/rich-info", {
		params: { gatewayId, systemId },
	});
}

// 查询配置中心Redis配置信息
export async function queryRedisConfig(): Promise<ApiResponse<RedisConfig>> {
	return get<RedisConfig>(PORT_GATEWAY_CENTER + "/api/v1/config/redis-config");
}

// 删除网关服务节点
export async function deleteGatewayServerNode(
	gatewayId: string,
	gatewayAddress: string
): Promise<ApiResponse<boolean>> {
	return del<boolean>(PORT_GATEWAY_CENTER + "/api/v1/config/gateway-servers", {
		params: { gatewayId, gatewayAddress },
	});
}

// 删除网关分配配置
export async function deleteGatewayDistribution(
	groupId: string,
	gatewayId: string,
	systemId: string
): Promise<ApiResponse<boolean>> {
	return del<boolean>(PORT_GATEWAY_CENTER + "/api/v1/config/gateway-distributions", {
		params: { groupId, gatewayId, systemId },
	});
}

/**
 * 负载均衡管理 API
 */

// 复制Nginx配置文件
export async function copyNginxConfig(): Promise<void> {
	await post(PORT_GATEWAY_CENTER + "/api/v1/load-balancing/nginx-config/copy");
}

// 更新Nginx配置
// 注意：当前后端接口不接受参数，需要后端修改为接受 @RequestBody NginxConfig
export async function updateNginxConfig(config: {
	upstreams: Array<{ name: string; loadBalance: string; servers: string[] }>;
	locations: Array<{ path: string; proxyPass: string }>;
}): Promise<ApiResponse<boolean>> {
	// 暂时不传递参数，因为后端接口不接受参数
	// TODO: 需要后端修改接口接受 @RequestBody NginxConfig 参数
	return put<boolean>(PORT_GATEWAY_CENTER + "/api/v1/load-balancing/nginx-config", config);
}

/**
 * RPC 服务注册管理 API
 */

// 注册应用服务
export async function registerApplication(
	systemId: string,
	systemName: string,
	systemType: string,
	systemRegistry: string
): Promise<ApiResponse<boolean>> {
	return post<boolean>(PORT_GATEWAY_CENTER + "/api/v1/register/applications", null, {
		params: { systemId, systemName, systemType, systemRegistry },
	});
}

// 注册应用接口
export async function registerApplicationInterface(
	systemId: string,
	interfaceId: string,
	interfaceName: string,
	interfaceVersion: string
): Promise<ApiResponse<boolean>> {
	return post<boolean>(PORT_GATEWAY_CENTER + "/api/v1/register/application-interfaces", null, {
		params: { systemId, interfaceId, interfaceName, interfaceVersion },
	});
}

// 注册应用接口方法
export async function registerApplicationInterfaceMethod(
	systemId: string,
	interfaceId: string,
	methodId: string,
	methodName: string,
	parameterType: string,
	uri: string,
	httpCommandType: string,
	auth: number
): Promise<ApiResponse<boolean>> {
	return post<boolean>(PORT_GATEWAY_CENTER + "/api/v1/register/application-interface-methods", null, {
		params: {
			systemId,
			interfaceId,
			methodId,
			methodName,
			parameterType,
			uri,
			httpCommandType,
			auth,
		},
	});
}

// 应用信息注册完成通知
export async function registerEvent(systemId: string): Promise<ApiResponse<boolean>> {
	return post<boolean>(PORT_GATEWAY_CENTER + "/api/v1/register/events", null, {
		params: { systemId },
	});
}

