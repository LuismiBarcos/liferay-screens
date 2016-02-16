/**
* Copyright (c) 2000-present Liferay, Inc. All rights reserved.
*
* This library is free software; you can redistribute it and/or modify it under
* the terms of the GNU Lesser General Public License as published by the Free
* Software Foundation; either version 2.1 of the License, or (at your option)
* any later version.
*
* This library is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
* details.
*/
import UIKit


public class LiferayAssetListPageOperation: LiferayPaginationOperation {

	public var groupId: Int64?
	public var classNameId: Int64?
	public var portletItemName: String?
	public var customEntryQuery: [String:AnyObject]?


	//MARK: ServerOperation

	override public func validateData() -> ValidationError? {
		let error = super.validateData()

		if error == nil {
			if groupId == nil {
				return ValidationError("assetlist-screenlet", "undefined-group")
			}

			if classNameId == nil && portletItemName == nil {
				return ValidationError("assetlist-screenlet", "undefined-classname")
			}
		}

		return error
	}

	override public func doRun(session session: LRSession) {
		if portletItemName != nil {
			if startRow == 0 {
				// since the service doesn't support pagination, we ask for
				// rows from the top to the endRow (whole single page)

				do {
					let entries = try doGetEntries(session, rowCount: Int32(endRow))
					if let serverPageContent = entries {
						resultPageContent = serverPageContent
						resultRowCount = serverPageContent.count
						lastError = nil
					}
					else {
						lastError = NSError.errorWithCause(.InvalidServerResponse)
						resultPageContent = nil
					}
				}
				catch let error as NSError {
					lastError = error
					resultPageContent = nil
				}
			}
			else {
				// return empty content for pages different from the first one
				resultPageContent = []
				resultRowCount = 0
			}
		}
		else {
			super.doRun(session: session)
		}
	}

	//MARK: LiferayPaginationOperation

	override public func doGetPageRowsOperation(session session: LRBatchSession, startRow: Int, endRow: Int) {

		var entryQuery = configureEntryQuery()

		entryQuery["start"] = startRow
		entryQuery["end"] = endRow

		let entryQueryWrapper = LRJSONObjectWrapper(JSONObject: entryQuery)

		doGetPageRows(session: session, entryQuery: entryQueryWrapper)
	}

	override public func doGetRowCountOperation(session session: LRBatchSession) {
		let entryQuery = configureEntryQuery()
		let entryQueryWrapper = LRJSONObjectWrapper(JSONObject: entryQuery)

		doGetRowCount(session: session, entryQuery: entryQueryWrapper)
	}

	public func doGetEntries(session: LRSession, rowCount: Int32) throws -> [[String:AnyObject]]? {
		return nil
	}

	public func doGetPageRows(session session: LRBatchSession, entryQuery: LRJSONObjectWrapper) {
	}

	public func doGetRowCount(session session: LRBatchSession, entryQuery: LRJSONObjectWrapper) {
	}

	//MARK: Private methods

	public func configureEntryQuery() -> [String:AnyObject] {
		var entryQuery = (customEntryQuery != nil)
			? customEntryQuery!
			: [String:AnyObject]()

		let defaultValues = [
			"classNameIds" : NSNumber(longLong: classNameId!),
			"groupIds" : NSNumber(longLong: groupId!),
			"visible" : "true"
		]

		for (k,v) in defaultValues {
			if entryQuery[k] == nil {
				entryQuery[k] = v
			}
		}

		return entryQuery
	}

}

public class Liferay62AssetListPageOperation: LiferayAssetListPageOperation {

	override public func doGetEntries(session: LRSession, rowCount: Int32) throws -> [[String:AnyObject]]? {
		let service = LRScreensassetentryService_v62(session: session)

		return try service.getAssetEntriesWithCompanyId(LiferayServerContext.companyId,
			groupId: groupId!,
			portletItemName: portletItemName!,
			locale: NSLocale.currentLocaleString,
			max: rowCount) as? [[String:AnyObject]]
	}

	override public func doGetPageRows(session session: LRBatchSession, entryQuery: LRJSONObjectWrapper) {
		do {
			let service = LRScreensassetentryService_v62(session: session)
			try service.getAssetEntriesWithAssetEntryQuery(entryQuery,
				locale: NSLocale.currentLocaleString)
		}
		catch _ as NSError {
		}
	}

	override public func doGetRowCount(session session: LRBatchSession, entryQuery: LRJSONObjectWrapper) {
		do {
			let service = LRAssetEntryService_v62(session: session)
			try service.getEntriesCountWithEntryQuery(entryQuery)
		}
		catch _ as NSError {
		}
	}

}


public class Liferay70AssetListPageOperation: LiferayAssetListPageOperation {

	override public func doGetEntries(session: LRSession, rowCount: Int32) throws -> [[String:AnyObject]]? {
		let service = LRScreensassetentryService_v70(session: session)

		return try service.getAssetEntriesWithCompanyId(LiferayServerContext.companyId,
			groupId: groupId!,
			portletItemName: portletItemName!,
			locale: NSLocale.currentLocaleString,
			max: rowCount) as? [[String:AnyObject]]
	}

	override public func doGetPageRows(session session: LRBatchSession, entryQuery: LRJSONObjectWrapper) {
		do {
			let service = LRScreensassetentryService_v70(session: session)
			try service.getAssetEntriesWithAssetEntryQuery(entryQuery,
				locale: NSLocale.currentLocaleString)
		}
		catch _ as NSError {
		}
	}

	override public func doGetRowCount(session session: LRBatchSession, entryQuery: LRJSONObjectWrapper) {
		do {
			let service = LRAssetEntryService_v70(session: session)
			try service.getEntriesCountWithEntryQuery(entryQuery)
		}
		catch _ as NSError {
		}
	}
	
}
